import { SectionHeading } from '@/components/header';
import Info from '@/components/info';
import useData from '@/contexts/DataContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FlatList, StyleSheet, View } from "react-native";
import ItemBox from './itemBox';
import ValueCard from './valueCard';

export const Overview = () => {
    const { 
        totalSales, 
        unclaimed, 
        production, 
        fullyPaid, 
        downpayment 
    } = useData()

    const styles = StyleSheet.create({
        overview: {
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        values: {
            flexDirection: 'row',
        }
    })
    
    return(
        <View style = {styles.overview}>
            
            <SectionHeading 
                title={'Overview'}/>

            <View style = {styles.values}>
                <Info 
                    title={'Sales'} 
                    value={`P${totalSales.toFixed(2)}`}/>
                <Info 
                    title={'Ship out'} 
                    value={unclaimed.length}/>
            </View>
            <View style = {styles.values}>
                <ValueCard 
                    title = {'Production'}
                    value = {production.length} />
                <ValueCard 
                    title = {'Full'}
                    value = {fullyPaid.length} />
                <ValueCard 
                    title = {'Partial'}
                    value = {downpayment.length} />   
            </View>
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
            <SectionHeading
                title={'Item'}
                link={'Add item'}/>
            
            <FlatList
                data={data}
                renderItem={renderGalleryItem}
                keyExtractor={item => item.id}
                numColumns={2}/>
        </View>
    )
}

export default Overview;