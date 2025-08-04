import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { NewsArticle } from '../services/newsService';

type Props = {
  article: NewsArticle;
};

const NewsCard: React.FC<Props> = ({ article }) => {
  const handlePress = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.85}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {article.title}
        </Text>

        {article.description ? (
          <Text numberOfLines={4} style={styles.description}>
            {article.description}
          </Text>
        ) : null}

        <Text style={styles.meta} numberOfLines={2}>
          {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CARD_WIDTH = responsiveWidth(75);
const CARD_HEIGHT = responsiveHeight(35);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '45%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '45%',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: responsiveFontSize(1.6),
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: '#222',
  },
  description: {
    fontSize: responsiveFontSize(1.4),
    color: '#444',
    marginTop: 4,
  },
  meta: {
    fontSize: responsiveFontSize(1.2),
    color: '#666',
    marginVertical: 6,
  },
});

export default NewsCard;
