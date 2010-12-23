class AddReceiveEmailToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :receive_email, :boolean
  end

  def self.down
    remove_column :users, :receive_email
  end
end