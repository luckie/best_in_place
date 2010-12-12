# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

User.delete_all

User.create!(:name => "Lucia", :last_name => "Bellamoli", :email => "luciabellamoli@gmail.com", :address => "Ca del Diavolo 9", :zip => "25123", :country => "Italy")
User.create!(:name => "Carmen", :last_name => "Sancerni", :email => "carmen@sancerni.com", :address => "c/Saraís 9", :zip => "21333", :country => "Spain")
User.create!(:name => "Angels", :last_name => "Farrero", :email => "angels@gmail.com", :address => "Sant Andreu 1", :zip => "08033", :country => "Spain")
  
