class User < ActiveRecord::Base
  validates :zip, :numericality => true, :length => { :minimum => 5 }
end