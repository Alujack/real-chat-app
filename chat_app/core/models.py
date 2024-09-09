from django.db import models
import uuid
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    profile_image = models.URLField(blank=True, null=True)
    public_key = models.TextField()  # Public RSA key
    private_key_encrypted = models.TextField()  # Encrypted private RSA key
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.username

    # Method to generate RSA keys when a user is created
    @classmethod
    def create_with_keys(cls, username, email, password_hash):
        user = cls(username=username, email=email, password_hash=password_hash)
        private_key, public_key = cls.generate_rsa_key_pair()
        user.private_key_encrypted = cls.encrypt_private_key(
            private_key, password_hash)  # Encrypt the private key
        user.public_key = public_key
        user.save()
        return user

    # Generate RSA key pair (private and public)
    @staticmethod
    def generate_rsa_key_pair():
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
            backend=default_backend()
        )
        private_pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()  # No encryption for now
        )
        public_key = private_key.public_key().public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )
        return private_pem.decode('utf-8'), public_key.decode('utf-8')

    # Encrypt the private key using a password (for example, a user's password hash)
    @staticmethod
    def encrypt_private_key(private_key_pem, password):
        # For simplicity, just returning the private key here
        # Use a real encryption mechanism like Fernet or AES to encrypt the private key
        return private_key_pem

    # Decrypt the private key when needed for decryption
    @staticmethod
    def decrypt_private_key(encrypted_private_key, password):
        # Use the password to decrypt the private key (e.g., Fernet or AES decryption)
        return encrypted_private_key  # Placeholder: decrypt using real logic

# Conversation model (Supports group and 1-on-1 chats)


class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_group = models.BooleanField(default=False)
    name = models.CharField(max_length=255, blank=True,
                            null=True)  # Group chat name
    group_image = models.URLField(
        blank=True, null=True)  # Group image (Optional)
    description = models.TextField(blank=True, null=True)  # Group description
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_conversations")

    def __str__(self):
        return self.name or f"Conversation {self.id}"

# Group admins for group conversations


class GroupAdmin(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="group_admins")
    admin = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.admin.username} (Admin) in {self.conversation.name}"

# Group invitation (Optional, if group invitations are needed)


class GroupInvitation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="invitations")
    invited_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="group_invitations")
    invited_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sent_invitations")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), (
        'accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending')

    def __str__(self):
        return f"Invitation to {self.invited_user.username} for {self.conversation.name}"

# Conversation participants (Handles both group and 1-on-1 chats)


class ConversationParticipant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="participants")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    # Track the last read message (UUID of the message)
    last_read_message = models.UUIDField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} in {self.conversation}"

# Message model for chat messages


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message_text = models.TextField(blank=True, null=True)  # Text message
    message_type = models.CharField(
        max_length=20, default="text")  # e.g., text, image, file
    # For file or media messages
    media_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.id} from {self.sender}"

# Reactions to messages (e.g., likes, emojis)


class MessageReaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    message = models.ForeignKey(
        Message, on_delete=models.CASCADE, related_name="reactions")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reaction_type = models.CharField(max_length=50)  # e.g., like, emoji
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} reacted to {self.message.id}"

# Attachments for messages


class Attachment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    message = models.ForeignKey(
        Message, on_delete=models.CASCADE, related_name="attachments")
    file_type = models.CharField(max_length=50)  # e.g., image, video, document
    file_url = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment {self.id} for message {self.message.id}"

# User status model (for tracking online/offline status)


class UserStatus(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="status")
    # Online, offline, away, etc.
    status = models.CharField(max_length=20, default="offline")
    last_active = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} is {self.status}"
