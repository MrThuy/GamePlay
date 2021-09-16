import React from 'react';
import { FlatList, View } from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect }: Props ){
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true
    },
    {
      id: '2',
      name: 'Galera do game',
      icon: 'image.png',
      owner: false
    },
    {
      id: '3',
      name: 'Lendários',
      icon: 'image.png',
      owner: true
    },
    {
      id: '4',
      name: 'Galera do game',
      icon: 'image.png',
      owner: false
    },
    {
      id: '5',
      name: 'Lendários',
      icon: 'image.png',
      owner: true
    },
    {
      id: '6',
      name: 'Galera do game',
      icon: 'image.png',
      owner: false
    }
  ];

  return (
    <View style={styles.container} >
        <FlatList
          data={guilds}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Guild
              data={item}
              onPress={() => handleGuildSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <ListDivider isCentered /> }
          ItemSeparatorComponent={() => <ListDivider isCentered /> }
          contentContainerStyle= {{ paddingBottom: 68, paddingTop: 104 }}
          style={styles.guilds}
        />

    </View>
  );
}