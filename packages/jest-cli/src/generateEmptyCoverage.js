/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

'use strict';

import type {Config, Path} from 'types/Config';

const IstanbulInstrument = require('istanbul-lib-instrument');

const {transformSource} = require('jest-runtime');

module.exports = function(source: string, filename: Path, config: Config) {
  // Transform file without instrumentation first, to make sure produced
  // source code is ES6 (no flowtypes etc.) and can be instrumented
  source = transformSource(filename, config, source, false);
  const instrumenter = IstanbulInstrument.createInstrumenter();
  instrumenter.instrumentSync(source, filename);
  return instrumenter.fileCoverage;
};
