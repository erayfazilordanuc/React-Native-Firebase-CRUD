import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 21,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#95b7ff' /*'#fe5a8a'*/,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  title: {
    fontFamily: 'DMSans-Bold',
    fontSize: 25,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  buttonGeneral: {
    color: '#1c1c1c',
    marginVertical: 5,
    padding: 7,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontFamily: 'DMSans-Medium',
    fontSize: 20,
  },
  dataList: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 0,
  },
  item: {
    fontFamily: 'DMSans-Regular',
    fontSize: 20,
    textAlign: 'left',
    color: '#303030',
  },
});

// Colors
// #95b7ff
// #fe5a8a
// #6d88fe
