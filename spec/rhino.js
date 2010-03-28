
load('./spec/lib/jspec.js')
load('./spec/lib/jspec.xhr.js')
load('lib/string.format.js')
load('lib/eventhub.js')
load('spec/unit/spec.helper.js')

JSpec
.exec('spec/unit/string.format.spec.js')
.exec('spec/unit/eventhub.spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()