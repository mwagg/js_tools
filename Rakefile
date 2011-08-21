task :default => [:lint, 'jasmine:ci' ]

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :lint do
  sh 'find lib -name "*.js" -print0 | xargs -0 node_modules/jslint/bin/jslint.js'
end
