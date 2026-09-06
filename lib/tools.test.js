'use strict';

/* global describe, it */

const assert = require('node:assert/strict');
const { extractSensorID } = require('./tools');

describe('extractSensorID', () => {
    it('extracts a KNX group address', () => {
        assert.equal(extractSensorID('controme.0.2.sensors.4/1/2.actualTemperature'), '4/1/2');
    });

    it('extracts existing hardware sensor ID formats', () => {
        assert.equal(extractSensorID('controme.0.7.sensors.05:14:53:e3.actualTemperature'), '05:14:53:e3');
        assert.equal(
            extractSensorID('controme.0.4.sensors.28_b4_c8_fe_0c_00_00_06.actualTemperature'),
            '28_b4_c8_fe_0c_00_00_06',
        );
    });

    it('rejects unrelated or incomplete state IDs', () => {
        assert.equal(extractSensorID('controme.0.2.sensors.4/1/2.humidity'), null);
        assert.equal(extractSensorID('controme.0.2.sensors.actualTemperature'), null);
        assert.equal(extractSensorID(null), null);
    });
});
