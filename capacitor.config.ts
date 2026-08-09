import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartgym.app',
  appName: 'Smart Gym',
  webDir: 'dist/tup-smart-gym/browser',
  server: {
    hostname: 'localhost:4200',
    androidScheme: 'http'
  }
};

export default config;