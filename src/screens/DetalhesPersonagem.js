
import { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';

import {
    Text,
    Card,
    Button
} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalhesPersonagemScreen({ route, navigation }) {

    const { personagem } = route.params;

    const nome = personagem.character?.name ?? 'Nome indisponível';

    const papel = personagem.role ?? 'Não informado';

    const imagem = personagem.character?.images?.jpg?.image_url;

    const id = personagem.character?.mal_id;

    const [detalhes, setDetalhes] = useState(null);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState('');

    useEffect(() => {

        let componenteAtivo = true;

        const buscarDetalhes = async () => {

            setCarregando(true);
            setErro('');
            setDetalhes(null);

            if (!id) {
                setErro('ID do personagem não encontrado.');
                setCarregando(false);
                return;
            }

            try {

                const resposta = await fetch(
                    `https://api.tenrai.org/v1/characters/${id}/full`
                );
                if (!resposta.ok) {
                    throw new Error('Erro ao consultar a API.');
                }

                const resultado = await resposta.json();

                if (componenteAtivo) {
                    setDetalhes(resultado.data);
                }

            } catch (error) {

                console.error('Erro ao buscar detalhes:', error);

                if (componenteAtivo) {
                    setErro(
                        'Não foi possível carregar as informações do personagem.'
                    );
                }

            } finally {

                if (componenteAtivo) {
                    setCarregando(false);
                }

            }
        };

        buscarDetalhes();

        return () => {
            componenteAtivo = false;
        };

    }, [id]);

    return (

        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                <Text
                    variant="headlineMedium"
                    style={styles.titulo}
                >
                    {nome}
                </Text>

                <Card style={styles.card}>

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

                        <Text
                            variant="titleLarge"
                            style={styles.subtitulo}
                        >
                            Informações do Ninja
                        </Text>

                        <Text variant="bodyLarge" style={styles.info}>
                            Participação: {papel}
                        </Text>

                        <Text variant="bodyMedium" style={styles.info}>
                            ID: {id ?? 'Não informado'}
                        </Text>

                        {carregando && (

                            <View style={styles.statusContainer}>

                                <ActivityIndicator
                                    size="small"
                                    color="#FF7A00"
                                />

                                <Text style={styles.status}>
                                    Carregando informações...
                                </Text>

                            </View>

                        )}

                        {erro !== '' && (

                            <Text style={styles.erro}>
                                {erro}
                            </Text>

                        )}

                        {detalhes && (

                            <>

                                {detalhes.name_kanji && (

                                    <Text style={styles.info}>
                                        Nome japonês: {detalhes.name_kanji}
                                    </Text>

                                )}

                                {detalhes.nicknames?.length > 0 && (

                                    <Text style={styles.info}>
                                        Apelidos: {detalhes.nicknames.join(', ')}
                                    </Text>

                                )}

                                {detalhes.favorites != null && (

                                    <Text style={styles.info}>
                                        Favoritos: {detalhes.favorites}
                                    </Text>

                                )}

                                {detalhes.about && (

                                    <View style={styles.biografiaContainer}>

                                        <Text
                                            variant="titleLarge"
                                            style={styles.subtitulo}
                                        >
                                            Biografia e curiosidades
                                        </Text>

                                        <Text style={styles.biografia}>
                                            {detalhes.about}
                                        </Text>

                                    </View>

                                )}

                            </>

                        )}

                    </Card.Content>

                </Card>

                <Button
                    mode="contained"
                    onPress={() => navigation.goBack()}
                    style={styles.botao}
                >
                    Voltar para personagens
                </Button>

            </ScrollView>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#0B1220',
    },

    content: {
        padding: 20,
        gap: 20,
        paddingBottom: 30,
    },

    titulo: {
        color: '#FF7A00',
        fontWeight: 'bold',
    },

    card: {
        backgroundColor: '#182436',
        borderRadius: 18,
        overflow: 'hidden',
    },

    imageContainer: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#182436',
    },

    imagem: {
        height: 350,
        width: '100%',
        backgroundColor: '#182436',
    },

    semImagem: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardContent: {
        paddingTop: 15,
        paddingBottom: 20,
        gap: 12,
    },

    subtitulo: {
        color: '#FF7A00',
        fontWeight: 'bold',
    },

    info: {
        color: '#FFFFFF',
        lineHeight: 24,
    },

    biografiaContainer: {
        marginTop: 15,
        gap: 12,
    },

    biografia: {
        color: '#DCE4F0',
        fontSize: 15,
        lineHeight: 25,
        textAlign: 'justify',
    },

    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
    },

    status: {
        color: '#AAB5C5',
    },

    erro: {
        color: '#FFB4AB',
        lineHeight: 22,
    },

    botao: {
        marginTop: 5,
        borderRadius: 30,
    },

});
