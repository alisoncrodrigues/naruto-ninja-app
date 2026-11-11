
import { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';

import {
    Text,
    Button,
    Card,
    ActivityIndicator,
    IconButton
} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
    obterFavoritos,
    alternarFavorito
} from '../storage/favoritesStorage';

const API_URL = 'https://api.tenrai.org/v1/anime/20/characters';

export default function PersonagensScreen({ navigation }) {

    const [personagens, setPersonagens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [recarregar, setRecarregar] = useState(0);
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {

        async function buscarPersonagens() {

            setCarregando(true);
            setErro(null);

            try {

                const resposta = await fetch(API_URL);

                if (!resposta.ok) {
                    throw new Error('Erro ao consultar a API');
                }

                const resultado = await resposta.json();

                setPersonagens(resultado.data ?? []);

            } catch (error) {

                console.log('Erro ao buscar personagens:', error);

                setErro('Não foi possível carregar os personagens.');

            } finally {

                setCarregando(false);

            }

        }

        buscarPersonagens();

    }, [recarregar]);


    useEffect(() => {

        async function carregarFavoritos() {

            const lista = await obterFavoritos();

            setFavoritos(lista);

        }

        carregarFavoritos();

        const unsubscribe = navigation.addListener(
            'focus',
            carregarFavoritos
        );

        return unsubscribe;

    }, [navigation]);

    async function lidarComFavorito(personagem) {

        try {

            const novaLista = await alternarFavorito(personagem);

            setFavoritos(novaLista);

        } catch (error) {

            console.log('Erro ao atualizar favorito:', error);

        }

    }

    const renderizarPersonagem = ({ item }) => {

        const nome = item.character?.name ?? 'Nome indisponível';

        const papel = item.role ?? 'Não informado';

        const imagem = item.character?.images?.jpg?.image_url;

        const id = item.character?.mal_id;

        const ehFavorito = favoritos.some(
            favorito => favorito.character?.mal_id === id
        );

        return (

            <Card
                style={styles.card}
                onPress={() => navigation.navigate('DetalhesPersonagem', {
                    personagem: item
                })}
            >

                {imagem ? (

                    <View style={styles.imageContainer}>

                        <Card.Cover
                            source={{ uri: imagem }}
                            style={styles.imagem}
                            resizeMode="contain"
                        />

                    </View>

                ) : (

                    <View style={styles.semImagem}>

                        <Text>Imagem indisponível</Text>

                    </View>

                )}

                <Card.Content style={styles.cardContent}>

                    <Text variant="titleMedium" style={styles.nome}>
                        {nome}
                    </Text>

                    <Text variant="bodyMedium" style={styles.papel}>
                        Participação: {papel}
                    </Text>

                </Card.Content>

                <Card.Actions style={styles.cardActions}>

                    <IconButton
                        icon={ehFavorito ? 'heart' : 'heart-outline'}
                        iconColor="#FF7A00"
                        size={28}
                        onPress={() => lidarComFavorito(item)}
                        accessibilityLabel={
                            ehFavorito
                                ? 'Remover dos favoritos'
                                : 'Adicionar aos favoritos'
                        }
                    />

                </Card.Actions>

            </Card>

        );

    };


    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.content}>

                <Text variant="headlineMedium" style={styles.title}>
                    Lista de Personagens
                </Text>

                <Text variant="bodyLarge" style={styles.subtitle}>
                    Conheça os ninjas do universo de Naruto!
                </Text>

                {carregando ? (

                    <View style={styles.estado}>

                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color="#FF7A00"
                        />

                        <Text style={styles.mensagem}>
                            Invocando personagens...
                        </Text>

                    </View>

                ) : erro ? (

                    <View style={styles.estado}>

                        <Text style={styles.erro}>
                            {erro}
                        </Text>

                        <Button
                            mode="contained"
                            onPress={() => setRecarregar(valor => valor + 1)}
                        >
                            Tentar novamente
                        </Button>

                    </View>

                ) : (

                    <FlatList
                        data={personagens}
                        keyExtractor={(item) =>
                            item.character.mal_id.toString()
                        }
                        renderItem={renderizarPersonagem}
                        contentContainerStyle={styles.lista}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={

                            <Text style={styles.mensagem}>
                                Nenhum personagem encontrado.
                            </Text>

                        }
                    />

                )}

                <Button
                    mode="contained"
                    buttonColor="#FF7A00"
                    textColor="#FFFFFF"
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>

            </View>

        </SafeAreaView>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0B1220',
    },

    content: {
        flex: 1,
        padding: 20,
        gap: 15,
    },

    title: {
        color: '#FF7A00',
        fontWeight: 'bold',
    },

    subtitle: {
        color: '#AAB5C5',
    },

    lista: {
        paddingBottom: 15,
    },

    imageContainer: {
        paddingHorizontal: 15,
        paddingVertical: 18,
        backgroundColor: '#182436',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        backgroundColor: '#182436',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
    },

    imagem: {
        height: 300,
        width: '100%',
        backgroundColor: '#182436',
        borderRadius: 12,
    },

    cardContent: {
        paddingTop: 12,
        paddingBottom: 12,
    },

    cardActions: {
        justifyContent: 'flex-end',
        paddingHorizontal: 12,
    },

    nome: {
        color: '#F0EBDF',
        fontWeight: 'bold',
    },

    papel: {
        color: '#AAB5C5',
        marginTop: 5,
    },

    estado: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

    mensagem: {
        color: '#F0EBDF',
        textAlign: 'center',
    },

    erro: {
        color: '#FFB4AB',
        textAlign: 'center',
    },

    semImagem: {
        height: 190,
        backgroundColor: '#263449',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
