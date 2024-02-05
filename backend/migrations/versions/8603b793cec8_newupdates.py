"""newUpdates

Revision ID: 8603b793cec8
Revises: c3eaa167bb26
Create Date: 2024-02-05 10:31:49.774241

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8603b793cec8'
down_revision = 'c3eaa167bb26'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('carts', sa.Column('price', sa.Integer(), nullable=True))
    op.add_column('orders', sa.Column('full_name', sa.String(), nullable=True))
    op.add_column('orders', sa.Column('address', sa.String(), nullable=True))
    op.add_column('orders', sa.Column('city', sa.String(), nullable=True))
    op.drop_column('orders', 'name')
    op.drop_column('orders', 'fee')
    op.drop_column('orders', 'date')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('date', sa.INTEGER(), nullable=True))
    op.add_column('orders', sa.Column('fee', sa.INTEGER(), nullable=True))
    op.add_column('orders', sa.Column('name', sa.VARCHAR(), nullable=True))
    op.drop_column('orders', 'city')
    op.drop_column('orders', 'address')
    op.drop_column('orders', 'full_name')
    op.drop_column('carts', 'price')
    # ### end Alembic commands ###
