
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@naruto-ninja-app:favoritos';

export async function obterFavoritos() {

    try {

        const dados = await AsyncStorage.getItem(CHAVE_FAVORITOS);

        return dados ? JSON.parse(dados) : [];

    } catch (error) {

        console.log('Erro ao recuperar favoritos:', error);

        return [];

    }

}

export async function salvarFavoritos(favoritos) {

    try {

        await AsyncStorage.setItem(
            CHAVE_FAVORITOS,
            JSON.stringify(favoritos)
        );

    } catch (error) {

        console.log('Erro ao salvar favoritos:', error);

        throw error;

    }

}

export async function alternarFavorito(personagem) {

    const favoritos = await obterFavoritos();

    const id = personagem.character?.mal_id;

    const jaExiste = favoritos.some(
        item => item.character?.mal_id === id
    );

    let novaLista;

    if (jaExiste) {

        novaLista = favoritos.filter(
            item => item.character?.mal_id !== id
        );

    } else {

        novaLista = [...favoritos, personagem];

    }

    await salvarFavoritos(novaLista);

    return novaLista;

}

export async function removerFavorito(id) {

    const favoritos = await obterFavoritos();

    const novaLista = favoritos.filter(
        item => item.character?.mal_id !== id
    );

    await salvarFavoritos(novaLista);

    return novaLista;

}
