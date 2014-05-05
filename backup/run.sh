#!/bin/bash

mongoexport --db citanie-na-dnes --collection reflectionmodels --out reflectionmodels.json
mongoexport --db citanie-na-dnes --collection usermodels --out usermodels.json
mongoexport --db citanie-na-dnes --collection system.indexes --out system.indexes.json