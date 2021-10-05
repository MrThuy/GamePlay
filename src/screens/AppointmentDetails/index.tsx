import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, FlatList, Alert, Platform, Share } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { api } from '../../services/api';
import * as Linking from 'expo-linking';

import BannerImg from '../../assets/banner.png';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

export function AppointmentDetails() {

  const [widGet, setWidGet] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const routes = useRoute();
  const { guildSelected } = routes.params as Params
  const navigation = useNavigation();

  async function fetchGuildWidGet() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidGet(response.data);
      setLoading(false);
    } catch {
      Alert.alert('Verifique as configurações do servirdor. Será que o WidGet está habilitado?');
      navigation.navigate('Home');
    }
  }

  function handleShareInvitation() {
    try {
      const message = Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : widGet.instant_invite;

      Share.share({
        message,
        url: widGet.instant_invite
      });
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  function handelOpenGuild() {
    Linking.openURL(widGet.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidGet();
  }, []);

  return (
    <Background>
      <Header
        title='Detalhes'
        action={
          widGet.instant_invite &&
          <BorderlessButton onPress={handleShareInvitation}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        style={styles.banner}
        source={BannerImg}
      >
        <View style={styles.bannerContent} >
          <Text style={styles.title} >
            {guildSelected.guild.name}
          </Text>
          <Text style={styles.subtitle} >
            {guildSelected.description}
          </Text>
        </View>

      </ImageBackground>

      {
        loading ?
          <Load />
          :
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widGet.members.length}`}
            />

            <FlatList
              data={widGet.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
      }

      {
        widGet.instant_invite &&
        <View style={styles.footer} >
          <ButtonIcon
            title="Entrar na partida"
            onPress={handelOpenGuild}
          />
        </View>
      }
    </Background>
  );
}