# Generated by Django 5.1.4 on 2025-01-19 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='description',
        ),
        migrations.AddField(
            model_name='expense',
            name='expense',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]