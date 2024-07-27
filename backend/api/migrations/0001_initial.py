# Generated by Django 5.0.7 on 2024-07-26 17:43

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('loan_id', models.AutoField(primary_key=True, serialize=False)),
                ('loan_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('loan_period', models.IntegerField(help_text='Loan period in months')),
                ('rate_of_interest', models.DecimalField(decimal_places=2, default=9.9, editable=False, max_digits=5)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loans', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DuesAndCalculations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=15)),
                ('amount_paid', models.DecimalField(decimal_places=2, default=0.0, max_digits=15)),
                ('amount_left', models.DecimalField(decimal_places=2, default=0.0, max_digits=15)),
                ('emi_left', models.IntegerField(default=0)),
                ('loan', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='dues_and_calculations', to='api.loan')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('payment_id', models.AutoField(primary_key=True, serialize=False)),
                ('payment_date', models.DateField(auto_now_add=True)),
                ('payment_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_type', models.CharField(choices=[('EMI', 'EMI'), ('Lumpsum', 'Lumpsum')], max_length=7)),
                ('loan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to='api.loan')),
            ],
        ),
    ]