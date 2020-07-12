module.exports = {
  name: 'front-end',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/front-end',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
