# in Terminal cake dev to run

fs = require 'fs'
{print} = require 'sys'
{log, error} = console; print = log
{spawn, exec} = require 'child_process'

run = (name, command, cb) ->
  cb = cb ? () ->
  proc = spawn(name, command.split(' '))
  proc.stdout.on('data', (buffer) -> print buffer if buffer = buffer.toString().trim())
  proc.stderr.on('data', (buffer) -> error buffer if buffer = buffer.toString().trim())
  proc.on 'exit', (status) ->
    process.exit(1) if status isnt 0
    cb()

task 'dev', 'Setup my dev system', () ->
  run 'supervisor', 'server'
