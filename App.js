import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, useWindowDimensions } from 'react-native';

export default function App() {
  const { width } = useWindowDimensions()

  const [listParams, setlistParams] = useState({ containerPadding: {}, cols: 1 })

 
  let x = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14
  ]



  const calcCols = (width)=> {
    let params = {
      cols: 0,
      containerPadding: 0,
      numColumns: 2,
    }
    
    if( width < 300 ) {
      params = {
        cols: 1,
        containerPadding: 0,
      }
    } else if ( width > 300 && width < 600 ) {
      params = {
        numColumns: 2,
        cols: 2,
        containerPadding: 0,
      }
    } else if ( width > 600 && width < 900 ) {
      params = {
        numColumns: 2,
        cols: 2,
        containerPadding: width * 0.05,
      }
    } else {
      params = {
        numColumns: 3,
        cols: 3,
        containerPadding: width * 0.1,
      }
    }

    setlistParams(params)
  } 


  useEffect(()=> {
    calcCols(width)
  }, [])

  useEffect(()=> {
    console.log("window size changed")
    calcCols(width)
  }, [ width ])

  useEffect(()=> {
    console.log("listParams changed")    
  }, [ listParams ])


  return (
    <View style={styles.container}>
      <Text>
        Numcols={1} did not work
      </Text>
      <Text>
        cols { listParams.cols } 
      </Text>
      <Text>
        params { JSON.stringify(listParams) } 
      </Text>
      <StatusBar style="auto" />

      <FlatList
        key={listParams.cols}
        data={x}
        keyExtractor={
          (item)=> item.toString()
        }
        renderItem={
          ({ item })=>{

            return (
              <View 
                style={[ styles.box, { height: 220 } ]}
              >
                <Text> {item} </Text>
              </View>
            )
          }
        }
        { ...listParams }
        contentContainerStyle={{
          paddingHorizontal: listParams.containerPadding
        }}
      />

      {/* <FlatList
        data={x}
        keyExtractor={
          (item)=> item.toString()
        }
        renderItem={
          ({ item })=>{

            return (
              <View 
                style={{
                  flex: 1,
                  width: width,
                  // width: (width-40)/2,
                  maxWidth: 440,
                  height: 120,
                  borderRadius: 20,
                  backgroundColor: 'red',
                  marginVertical: 12,
                  marginHorizontal: 10,
                }}
              />
            )
          }
        }
        style={{

        }}
      /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    paddingHorizontal: 16,
  },

  box: {
    flex: 1,
    // width: (width-40)/2,
    maxWidth: 440,
    height: 1600,
    borderRadius: 20,
    backgroundColor: 'red',
    marginVertical: 12,
    marginHorizontal: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },

});
