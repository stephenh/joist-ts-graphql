#!/bin/bash

set -e

JOIST_HOME="${JOIST_HOME:-../joist-ts}"

for package in orm codegen graphql-codegen graphql-resolver-utils test-utils ; do
  npx copy-and-watch --watch "$JOIST_HOME/packages/$package/build/**/*" ./node_modules/joist-$package/build/ &
done

sleep infinity

