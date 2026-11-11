
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';

import {
  Text,
  Card,
  IconButton,
  ActivityIndicator
} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  obterFavoritos,
  removerFavorito
} from '../storage/favoritesStorage';


export default function FavoritosScreen({ navigation }) {

  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {

    const carregarFavoritos = async () => {

      try {
        setCarregando(true);

        const listaSalva = await obterFavoritos();

        setFavoritos(listaSalva);

      } catch (erro) {
        console.log('Erro ao carregar favoritos:', erro);

      } finally {
        setCarregando(false);
      }

    };


    carregarFavoritos();


    const unsubscribe = navigation.addListener(
      'focus',
      carregarFavoritos
    );

    return unsubscribe;

  }, [navigation]);


  const lidarComRemover = async (id) => {

    try {
      const novaLista = await removerFavorito(id);

      setFavoritos(novaLista);

    } catch (erro) {
      console.log('Erro ao remover favorito:', erro);
    }

  };

  const renderizarFavorito = ({ item }) => {

    const personagem = item.character;

    return (

      <Card style={styles.card}>

        {personagem?.images?.jpg?.image_url ? (

          <Card.Cover
            source={{
              uri: personagem.images.jpg.image_url
            }}
            style={styles.imagem}
          />

        ) : null}

        <Card.Content style={styles.conteudo}>

          <Text
            variant="titleLarge"
            style={styles.nome}
          >
            {personagem?.name ?? 'Personagem sem nome'}
          </Text>

          <Text style={styles.participacao}>
            Participação: {item.role ?? 'Não informada'}
          </Text>

        </Card.Content>

        <Card.Actions style={styles.acoes}>

          <IconButton
            icon="heart"
            iconColor="#FF7A00"
            size={28}
            onPress={() => lidarComRemover(personagem?.mal_id)}
          />

        </Card.Actions>

      </Card>

    );

  };


  return (

    <SafeAreaView style={styles.container}>

      <FlatList
        data={favoritos}
        keyExtractor={(item, index) =>
          String(item.character?.mal_id ?? index)
        }
        renderItem={renderizarFavorito}
        contentContainerStyle={styles.lista}

        ListHeaderComponent={

          <Text
            variant="headlineMedium"
            style={styles.titulo}
          >
            Meus Favoritos
          </Text>

        }

        ListEmptyComponent={

          carregando ? (

            <ActivityIndicator
              size="large"
              color="#FF7A00"
              style={styles.carregando}
            />

          ) : (

            <Text style={styles.mensagem}>
              Você ainda não possui personagens favoritos!
            </Text>

          )

        }

      />

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },

  lista: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },

  titulo: {
    color: '#FF7A00',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },

  card: {
    backgroundColor: '#182436',
    borderRadius: 24,
    marginBottom: 25,
    overflow: 'hidden',
  },

  imagem: {
    height: 350,
    resizeMode: 'contain',
  },

  conteudo: {
    paddingTop: 20,
    paddingBottom: 10,
  },

  nome: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  participacao: {
    color: '#AAB5C5',
    fontSize: 17,
    marginTop: 10,
  },

  acoes: {
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },

  mensagem: {
    color: '#AAB5C5',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 60,
  },

  carregando: {
    marginTop: 50,
  },

});
