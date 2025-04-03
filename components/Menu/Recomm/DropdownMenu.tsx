import React from 'react';
import { FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownMenuItem from './DropdownMenuItem';



const menuItems = [
    {
        id : 1,
        title : 'Most Recent',
    },
    {
        id : 2,
        title : 'Most Popular',
    },
    {
        id : 3,
        title : 'Most Voted',
    }
]

export interface DropdownMenuRecomCompRef {
  openDropdownMenu: () => void;
  closeDropdownMenu: () => void;
}


const DropdownMenuRecomComp = React.forwardRef<DropdownMenuRecomCompRef> ((_,ref) => {
    const [open, setOpen] = React.useState(false);

    const closeDropdownMenu = () => {
        setOpen(false);
    }
    const openDropdownMenu = () => {
        setOpen(true);
    }
    React.useImperativeHandle(ref,() => ({
        openDropdownMenu : openDropdownMenu,
        closeDropdownMenu : closeDropdownMenu
    }))
  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <SafeAreaView>
          <View
            style={{
              width: scale(200),
              height: verticalScale(180),
              marginTop: verticalScale(120),
              borderRadius: moderateScale(8),
              backgroundColor: 'rgba(53, 69, 98, 1)',
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 1,
              shadowOffset: {
                width: 1,
                height: 4,
              },
              zIndex: 100,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: moderateScale(0.5),
                borderBottomColor: 'rgba(255,255,255,0.5)',
                paddingVertical: verticalScale(3),
                paddingHorizontal: scale(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 0.7,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Poppins_600SemiBold',
                    fontSize: moderateScale(18),
                    color: 'white',
                    opacity: 0.5,
                    padding: scale(10),
                  }}>
                  Sort By
                </Text>
              </View>
              <TouchableOpacity
              onPress={closeDropdownMenu}
                style={{
                  flex: 0.29,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name="closecircleo"
                  size={moderateScale(15)}
                  color="rgba(255,255,255,0.5)"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: verticalScale(0.5),
                    backgroundColor: 'white',
                    opacity: 0.5,
                  }}
                />
              )}
              renderItem={({ item }) => <DropdownMenuItem item={item} />}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
})

DropdownMenuRecomComp.displayName = 'DropdownMenuRecomComp';

export default DropdownMenuRecomComp;