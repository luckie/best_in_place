# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "best_in_place/version"

Gem::Specification.new do |s|
  s.name        = "best_in_place"
  s.version     = BestInPlace::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Bernat Farrero"]
  s.email       = ["bernat@itnig.net"]
  s.homepage    = "http://github.com/bernat/best_in_place"
  s.summary     = %q{It allows the views to become in-place editable, it works for inputs, textareas, selects and checkbox}
  s.description = %q{It allows the views to become in-place editable, it works for inputs, textareas, selects and checkbox}

  s.rubyforge_project = "best_in_place"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  s.add_dependency "rails", "~> 3.0.0"
end
