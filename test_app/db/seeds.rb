# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

User.delete_all

User.create!(:name => "Lucia", :last_name => "Napoli", :email => "lucianapoli@gmail.com", :address => "Via Diavolo 99", :zip => "25123", :country => "Italy", :receive_email => false)
User.create!(:name => "Carmen", :last_name => "Luciago", :email => "carmen@luciago.com", :address => "c/Ambrosio 10", :zip => "21333", :country => "Spain", :receive_email => true)
User.create!(:name => "Angels", :last_name => "Domènech", :email => "angels@gmail.com", :address => "Avinguda Sant Andreu 1", :zip => "08033", :country => "Spain", :receive_email => false)
