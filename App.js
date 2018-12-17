import {createStackNavigator, createAppContainer} from 'react-navigation';
import  MenuScreen from './MenuScreen';
import SetupScreen from './SetupScreen';
import PreMissionScreen from './PreMissionScreen';
import MissionExecutionScreen from './MissionExecutionScreen';
import PostMissionScreen from './PostMissionScreen';
import SummaryScreen from './SummaryScreen';
import LibraryScreen from './LibraryScreen';

const RootStack = createStackNavigator({
    Home: {screen: MenuScreen},
    Setup: {screen: SetupScreen},
    PreMission: {screen: PreMissionScreen},
    MissionExecution: {screen: MissionExecutionScreen},
    PostMission: {screen: PostMissionScreen},
    Summary: {screen: SummaryScreen},
    Library: {screen: LibraryScreen}
});

const App = createAppContainer(RootStack);

export default App;