from django.db import migrations


RENAME_TABLES_FORWARD = """
DO $$
BEGIN
    IF to_regclass('public.organize_session') IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.organize_session RENAME TO core_session';
    END IF;

    IF to_regclass('public.organize_subject') IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.organize_subject RENAME TO core_subject';
    END IF;
END
$$;
"""

RENAME_TABLES_BACKWARD = """
DO $$
BEGIN
    IF to_regclass('public.core_session') IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.core_session RENAME TO organize_session';
    END IF;

    IF to_regclass('public.core_subject') IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.core_subject RENAME TO organize_subject';
    END IF;
END
$$;
"""


def rename_tables_forward(apps, schema_editor):
    if schema_editor.connection.vendor != "postgresql":
        return
    schema_editor.execute(RENAME_TABLES_FORWARD)


def rename_tables_backward(apps, schema_editor):
    if schema_editor.connection.vendor != "postgresql":
        return
    schema_editor.execute(RENAME_TABLES_BACKWARD)


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0008_alter_subject_isactive"),
    ]

    operations = [
        migrations.RunPython(rename_tables_forward, rename_tables_backward),
        migrations.RunSQL(
            sql="UPDATE django_content_type SET app_label = 'core' WHERE app_label = 'organize';",
            reverse_sql="UPDATE django_content_type SET app_label = 'organize' WHERE app_label = 'core';",
        ),
        migrations.RunSQL(
            sql="UPDATE django_migrations SET app = 'core' WHERE app = 'organize';",
            reverse_sql="UPDATE django_migrations SET app = 'organize' WHERE app = 'core';",
        ),
    ]
