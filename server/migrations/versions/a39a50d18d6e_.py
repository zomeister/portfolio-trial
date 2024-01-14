"""empty message

Revision ID: a39a50d18d6e
Revises: eddc66c31a89
Create Date: 2024-01-14 00:00:00.979043

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a39a50d18d6e'
down_revision = 'eddc66c31a89'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('_alembic_tmp_users')
    with op.batch_alter_table('profiles', schema=None) as batch_op:
        batch_op.drop_constraint('fk_profiles_user_id_users', type_='foreignkey')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(), nullable=False))
        batch_op.drop_constraint('uq_users_username', type_='unique')
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.VARCHAR(length=80), nullable=False))
        batch_op.create_unique_constraint('uq_users_username', ['username'])
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    with op.batch_alter_table('profiles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_profiles_user_id_users', 'users', ['user_id'], ['id'])

    op.create_table('_alembic_tmp_users',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(length=80), nullable=False),
    sa.Column('email', sa.VARCHAR(length=120), nullable=True),
    sa.Column('_password_hash', sa.VARCHAR(), nullable=True),
    sa.Column('first_name', sa.VARCHAR(), nullable=False),
    sa.Column('last_name', sa.VARCHAR(), nullable=False),
    sa.Column('birthday', sa.DATETIME(), nullable=True),
    sa.PrimaryKeyConstraint('id', name='pk_users'),
    sa.UniqueConstraint('username', name='uq_users_username')
    )
    op.create_table('messages',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('created_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DATETIME(), nullable=True),
    sa.Column('friendship_id', sa.INTEGER(), nullable=True),
    sa.Column('profile_id', sa.INTEGER(), nullable=True),
    sa.Column('content', sa.VARCHAR(), nullable=True),
    sa.ForeignKeyConstraint(['friendship_id'], ['friendships.id'], name='fk_messages_friendship_id_friendships'),
    sa.ForeignKeyConstraint(['profile_id'], ['profiles.id'], name='fk_messages_profile_id_profiles'),
    sa.PrimaryKeyConstraint('id', name='pk_messages')
    )
    # ### end Alembic commands ###
