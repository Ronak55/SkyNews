import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { useWeatherNews } from "../hooks/useWeatherNews";
import NewsCard from "../components/NewsCard";

const HomeScreen = () => {
  const { unit, weather, news, forecast, weatherLoading, newsLoading } =
    useWeatherNews();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <Text style={styles.appTitle}>SkyNews</Text>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Weather Section */}
        {weatherLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Fetching weather...</Text>
          </View>
        ) : (
          <View style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <View>
                <Text style={styles.locationText}>
                  {weather?.name || "Location"}
                </Text>
                <Text style={styles.tempText}>
                  {Math.round(weather?.main?.temp ?? 0)}°
                  {unit === "metric" ? "C" : "F"}
                </Text>
                <Text style={styles.descText}>
                  {weather?.weather?.[0]?.description || "N/A"}
                </Text>
              </View>
              {weather?.weather?.[0]?.icon && (
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                  }}
                  style={styles.weatherIcon}
                />
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                🌡️ Feels like: {weather?.main?.feels_like ?? "-"}°
              </Text>
              <Text style={styles.infoText}>
                💧 Humidity: {weather?.main?.humidity ?? "-"}%
              </Text>
              <Text style={styles.infoText}>
                💨 Wind: {weather?.wind?.speed ?? "-"} m/s
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {forecast.map((day, index) => (
                <View key={index} style={styles.forecastCard}>
                  <Text style={styles.forecastDate}>
                    {new Date(day.dt_txt).toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </Text>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                    }}
                    style={styles.forecastIcon}
                  />
                  <Text style={styles.forecastTemp}>
                    {Math.round(day.main.temp)}°{unit === "metric" ? "C" : "F"}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* News Section */}
        <Text style={styles.newsTitle}>Top News</Text>
        {newsLoading ? (
          <View style={styles.newsLoadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.loadingText}>Fetching news...</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newsScroll}
          >
            {news.length > 0 ? (
              news.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))
            ) : (
              <Text style={styles.noNewsText}>No matching articles found.</Text>
            )}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(4),
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginVertical: 12,
  },
  newsLoadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: responsiveFontSize(2),
    color: "#555",
  },
  weatherCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: responsiveWidth(5),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherIcon: {
    width: 70,
    height: 70,
  },
  locationText: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: "600",
    color: "#222",
  },
  tempText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "700",
    marginTop: 4,
    color: "#000",
  },
  descText: {
    fontSize: responsiveFontSize(1.9),
    textTransform: "capitalize",
    color: "#777",
    marginTop: 4,
  },
  infoRow: {
    marginTop: 12,
    gap: 6,
  },
  infoText: {
    fontSize: responsiveFontSize(1.9),
    color: "#444",
  },
  newsTitle: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "600",
    marginVertical: 12,
    color: "#111",
  },
  newsScroll: {
    paddingBottom: 20,
  },
  noNewsText: {
    fontSize: responsiveFontSize(2),
    color: "#999",
    paddingLeft: 10,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 4,
    color: "#333",
  },
  forecastCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
    marginVertical: 2,
    marginRight: 12,
    alignItems: "center",
    width: 80,
    elevation: 2,
  },
  forecastDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  forecastIcon: {
    width: 40,
    height: 40,
    marginBottom: 3,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default HomeScreen;
