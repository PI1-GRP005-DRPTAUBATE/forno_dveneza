from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Cliente
from carrinho.models import Carrinho

@receiver(post_save, sender=Cliente)
def criar_carrinho(sender, instance, created, **kwargs):
    if created:
        Carrinho.objects.create(cliente=instance)
