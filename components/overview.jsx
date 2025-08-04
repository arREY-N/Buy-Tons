import { SubHead } from '@/components/header';
import Info from '@/components/info';
import useData from '@/contexts/DataContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FlatList, StyleSheet, View } from "react-native";
import ItemBox from './itemBox';

export const Overview = () => {
    const { totalSales, pending } = useData();

    const styles = StyleSheet.create({
        overview:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    })
    
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
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        empty: {
            backgroundColor: theme.container,
            flex: 1,
            margin: 5
        }
    })

    const renderGalleryItem = ({item}) => {
        if(item.isSpacer){
            return <View style = {styles.empty}/>
        }
        return(
            <ItemBox item = { item }/>
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