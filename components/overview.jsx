import { SubHead } from '@/components/header';
import useData from '@/contexts/DataContext';
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

const Info = ({title, value}) => {
    return(
        <View style = {styles.infoContainer}>
            <Text style = {styles.infoTitle}>{title}</Text>
            <Text style = {styles.infoValue}>{value}</Text>
        </View>
    )
}

export const Overview = () => {
    const { totalSales, pending } = useData();

    console.log(pending.length);
    
    return(
        <View style = {styles.overview}>
            <Info 
                title={'Total Sales'} 
                value={`P${totalSales.toFixed(2)}`}/>
            
            <Info 
                title={'Pending Orders'} 
                value={pending.length}/>
        </View>
    )
}

export const ItemGallery = () => {
    const { data } = useData() 

    const renderGalleryItem = ({item}) => {
        if(item.isSpacer){
            return <View style = {styles.empty}/>
        }
        return(
            <View style = {styles.item}>
                <View style={styles.itemImage}/>
                <View style = {styles.itemInfo}>
                    <Text>{item.name}</Text>
                    <Text>P{item.price.toFixed(2)}</Text>
                </View>
            </View>
        )
    }

    return(
        <View>
            <SubHead/>
            
            <FlatList
                data={data}
                renderItem={renderGalleryItem}
                keyExtractor={item => item.id}
                numColumns={2}/>
        </View>
    )
}

export default Overview;

const styles = StyleSheet.create({
    overview:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoContainer: {
        backgroundColor: '#eee',
        flex: 1,
        margin: 5, 
        padding: 20,
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 6
            },
            android: {
                elevation: 10,
            }
        }),
    },
    infoValue: {
        textAlign: 'right',
        fontSize: 30,
        fontWeight: '500'
    },
    empty: {
        flex: 1,
        margin: 5
    },
    item:{
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 16,
        flex: 1,
        alignItems: 'center',
        margin: 5
    },
    itemImage: {
        backgroundColor: '#ddd',
        height: 150,
        width: '100%',
        borderTopEndRadius: 16,
        borderTopStartRadius: 16
    },
    itemInfo: {
        width: '90%',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})