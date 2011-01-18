desc "This task is called by the Heroku cron add-on"
task :cron => :environment do
 if Time.now.hour == 0 # run at midnight
   Rake::Task["db:setup"].execute
   puts "db:setup performed"
 end
end