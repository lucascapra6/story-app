module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@domain': './src/domain',
          '@api': './src/api',
          '@types': './src/types',
          '@infra': './src/infra',
        },
      },
    ],
  ],
};
