/* Begin Test Code */
var WoosterPoints = new Category([], 'Random Points');
var myPoint = new MapObject(Math.random() * 360 - 180, Math.random() * 180 - 90, "Myspot", [1, 1, 1992], [03, 02, 2011], "place", ['location'], "aaaaa");
var myPoint2 = new MapObject(Math.random() * 360 - 180, Math.random() * 180 - 90, "Myspot2", [01, 01, 1940], [03, 11, 1963], "place2", [], "aa3aa");
var rome = new MapObject(12.5, 41.9, "Rome", [01, 01, 1910], [03, 11, 1943], "place2", ['location', 'place'], "<img src='http://cache-graphicslib.viator.com/graphicslib/thumbs674x446/3731/SITours/skip-the-line-ancient-rome-and-colosseum-half-day-walking-tour-in-rome-114992.jpg'>");
var london = new MapObject(-0.12755, 51.5072229, "Jolly Good Olde England", [01, 01, 1877], [03, 11, 1983], "place2", ['place'], '<iframe width="120" height="120" src="https://www.youtube.com/embed/tN9EC3Gy6Nk" frameborder="0" allowfullscreen></iframe>');
var demoPoint = new MapObject(-13.521802,-71.961852,"test",[01,02,2003],[1,3,2004],"words",[],"");
WoosterPoints.add(london);
WoosterPoints.add(rome);
WoosterPoints.add(myPoint2);
WoosterPoints.add(myPoint);
WoosterPoints.add(demoPoint);
var geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:3857'
        }
    },
    'features': [{
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [0, 0]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': [
                [4e6, -2e6],
                [8e6, 2e6]
            ]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': [
                [4e6, 2e6],
                [8e6, -2e6]
            ]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': [
                [
                    [-5e6, -1e6],
                    [-4e6, 1e6],
                    [-3e6, -1e6]
                ]
            ]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'MultiLineString',
            'coordinates': [
                [
                    [-1e6, -7.5e5],
                    [-1e6, 7.5e5]
                ],
                [
                    [1e6, -7.5e5],
                    [1e6, 7.5e5]
                ],
                [
                    [-7.5e5, -1e6],
                    [7.5e5, -1e6]
                ],
                [
                    [-7.5e5, 1e6],
                    [7.5e5, 1e6]
                ]
            ]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'MultiPolygon',
            'coordinates': [
                [
                    [
                        [-5e6, 6e6],
                        [-5e6, 8e6],
                        [-3e6, 8e6],
                        [-3e6, 6e6]
                    ]
                ],
                [
                    [
                        [-2e6, 6e6],
                        [-2e6, 8e6],
                        [0, 8e6],
                        [0, 6e6]
                    ]
                ],
                [
                    [
                        [1e6, 6e6],
                        [1e6, 8e6],
                        [3e6, 8e6],
                        [3e6, 6e6]
                    ]
                ]
            ]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'GeometryCollection',
            'geometries': [{
                'type': 'LineString',
                'coordinates': [
                    [-5e6, -5e6],
                    [0, -5e6]
                ]
            }, {
                'type': 'Point',
                'coordinates': [4e6, -5e6]
            }, {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [1e6, -6e6],
                        [2e6, -4e6],
                        [3e6, -6e6]
                    ]
                ]
            }]
        }
    }]
};
var testjsontwo = {
    "type": "FeatureCollection",
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:4326'
        }
    },
    "features": [{
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-106.69921875, 30.29701788337205],
                    [-101.953125, 47.517200697839414],
                    [-82.96875, 32.10118973232094],
                    [-98.96484375, 22.59372606392931],
                    [-106.69921875, 30.29701788337205]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-101.04093739762902, -86.03016863577068]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-51.51189495809376, 69.84675179701298]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [56.38943647965789, -41.282402691431344]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [69.67356679961085, 6.654403572902083]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-114.2719176504761, -89.46301551070064]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-149.82692554593086, -0.3384833363816142]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [150.35305442288518, -87.91453110985458]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-42.859390592202544, -62.65848599374294]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-50.68952347151935, -48.45598289743066]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [152.19526053406298, -12.210492719896138]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [128.85919159278274, 3.701364453881979]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [24.065079102292657, -14.043619469739497]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [109.50954079627991, -29.211028064601123]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [58.017216911539435, -9.882895709015429]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [153.2333435676992, -21.110124131664634]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [8.962282827124, 8.141445270739496]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [95.91306078247726, 47.33212533406913]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-112.69117101095617, -5.1503335777670145]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [23.460896937176585, -47.6066555455327]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-3.325771875679493, 17.559938952326775]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-175.65565363503993, 1.7252455791458488]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-72.79110889881849, -47.54236198961735]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-164.5276982523501, -21.909209517762065]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-104.31224224157631, 64.0884802909568]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-151.24629112891853, 37.63951651286334]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-145.79467859119177, 80.82137153483927]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-117.84385588020086, -24.720377842895687]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-133.30612683668733, -83.78863922785968]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-109.34758474119008, 51.256497194990516]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [39.94316194206476, 41.67303127236664]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [79.18668382801116, -45.3351374482736]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [173.0098856985569, -5.485722189769149]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-122.39369415678084, 3.3247550670057535]
        },
        "properties": {}
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [48.73739071190357, -65.59151181019843]
        },
        "properties": {}
    }]
}
var objectLayer = new geoJSONCategory(geojsonObject, 'test', [05, 03, 1962], [11, 11, 1974], ['a tag'], 'abcdjf');
var objectLayertwo = new geoJSONCategory(testjsontwo, 'yet another test', [06, 14, 1941], [01, 11, 1964], ['a tag'], 'abcdjf');
var remoteKML = "http://localhost:9250/GeoJSON.js";
var remoteLayertest = new RemoteLayer(remoteKML, 'GeoJSON', 'New Test', [05, 03, 1922], [11, 11, 1934], ['ye olde tag!', 'ye olde tag!'], 'abcdjf')
var testmap = [];
testmap.push(WoosterPoints);
testmap.push(objectLayer);
testmap.push(objectLayertwo);
testmap.push(remoteLayertest);
/* End Test Code*/
