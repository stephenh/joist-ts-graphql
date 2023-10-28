#!/bin/bash

set -e

JOIST_HOME="${JOIST_HOME:-../joist-ts}"

for package in orm codegen graphql-codegen graphql-resolver-utils utils test-utils migration-utils; do
  yarn dlx copy-and-watch --watch "$JOIST_HOME/packages/$package/build/**/*" ./node_modules/joist-$package/build/ &
done

sleep 2147483647

