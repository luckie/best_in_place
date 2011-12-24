class AddMoneyToUser < ActiveRecord::Migration
  def change
    add_column :users, :money, :float
  end
end
