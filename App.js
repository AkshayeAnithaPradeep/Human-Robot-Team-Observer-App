import {createStackNavigator, createAppContainer} from 'react-navigation';
import  MenuScreen from './screens/MenuScreen';
import SetupScreen from './screens/SetupScreen';
import PreMissionScreen from './screens/PreMissionScreen';
import MissionExecutionScreen from './screens/MissionExecutionScreen';
import PostMissionScreen from './screens/PostMissionScreen';
import SummaryScreen from './screens/SummaryScreen';
import LibraryScreen from './screens/LibraryScreen';

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