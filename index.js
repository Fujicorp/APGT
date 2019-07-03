import { AppRegistry, YellowBox } from 'react-native';
import Navigation from './src/Navigation'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('ReactNavigationSample', () => Navigation);
