
import { StyleSheet, View } from 'react-native';

import {
  Text,
  Card,
  Button,
  Appbar
} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>

      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Naruto - Ninja App" />
      </Appbar.Header>

      <View style={styles.content}>

        <Text variant="headlineLarge" style={styles.title}>
          GUIA SHINOBI
        </Text>

        <Text variant="bodyLarge" style={styles.subtitle}>
          Explore o universo de Naruto!
        </Text>

        <Card style={styles.card}>

          <Card.Content>

            <Text variant="titleLarge" style={styles.cardTitle}>
              Bem-vindo à Vila da Folha!
            </Text>

            <Text variant="bodyMedium" style={styles.description}>
              Conheça personagens, clãs, vilas e curiosidades
              do universo ninja.
            </Text>

          </Card.Content>

          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Personagens')}
            >
              Iniciar jornada
            </Button>
          </Card.Actions>

        </Card>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },

  header: {
    backgroundColor: '#0B1220',
  },

  content: {
    flex: 1,
    padding: 25,
    gap: 15,
  },

  title: {
    color: '#F97316',
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#AAB5C5',
  },

  card: {
    backgroundColor: '#182436',
    borderRadius: 18,
  },

  cardTitle: {
    color: '#F97316',
    marginBottom: 12,
  },

  description: {
    color: '#FFFFFF',
    lineHeight: 23,
  },

});
