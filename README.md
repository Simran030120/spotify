import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset (replace with your actual file path)
file_path = 'dataset/Spotify.csv'
spotify_data = pd.read_csv(file_path, encoding='ISO-8859-1')

# Convert 'streams' to numeric (remove commas if present)
spotify_data['streams'] = pd.to_numeric(spotify_data['streams'].str.replace(',', ''), errors='coerce')

# 1. What are the top 10 most streamed tracks?
top_10_streamed = spotify_data.nlargest(10, 'streams')[['track_name', 'streams']]

# Plot a bar chart
plt.figure(figsize=(10, 6))
sns.barplot(data=top_10_streamed, x='streams', y='track_name', palette='Blues_d')
plt.title('Top 10 Most Streamed Tracks')
plt.xlabel('Streams')
plt.ylabel('Track Name')
plt.show()

# 2. How does the number of streams vary by release year?
streams_by_year = spotify_data.groupby('released_year')['streams'].sum().reset_index()

# Line plot
plt.figure(figsize=(10, 6))
sns.lineplot(data=streams_by_year, x='released_year', y='streams', marker='o', color='green')
plt.title('Total Streams by Release Year')
plt.xlabel('Release Year')
plt.ylabel('Total Streams')
plt.show()

# 3. Which artists have the most tracks in Spotify playlists?
top_artists = spotify_data.groupby('artist(s)_name')['in_spotify_playlists'].sum().nlargest(10).reset_index()

# Bar chart
plt.figure(figsize=(10, 6))
sns.barplot(data=top_artists, x='in_spotify_playlists', y='artist(s)_name', palette='Purples_d')
plt.title('Top 10 Artists with Most Tracks in Spotify Playlists')
plt.xlabel('Number of Tracks in Playlists')
plt.ylabel('Artist Name')
plt.show()

# 4. What is the distribution of danceability scores among the tracks?
plt.figure(figsize=(10, 6))
sns.histplot(spotify_data['danceability_%'], bins=20, kde=True, color='skyblue')
plt.title('Distribution of Danceability Scores')
plt.xlabel('Danceability (%)')
plt.ylabel('Frequency')
plt.show()

# 5. How do energy and acousticness scores correlate?
plt.figure(figsize=(10, 6))
sns.scatterplot(data=spotify_data, x='energy_%', y='acousticness_%', hue='released_year', palette='viridis', alpha=0.6)
plt.title('Correlation between Energy and Acousticness')
plt.xlabel('Energy (%)')
plt.ylabel('Acousticness (%)')
plt.show()

# 6. What is the distribution of key and mode in the tracks?
key_mode_count = spotify_data.groupby(['key', 'mode']).size().reset_index(name='count')

# Grouped bar chart
plt.figure(figsize=(12, 8))
sns.barplot(data=key_mode_count, x='key', y='count', hue='mode', palette='Set2')
plt.title('Distribution of Key and Mode in Tracks')
plt.xlabel('Key')
plt.ylabel('Count of Tracks')
plt.legend(title='Mode')
plt.show()

# 7. Which month sees the highest number of track releases?
tracks_per_month = spotify_data['released_month'].value_counts().sort_index().reset_index()
tracks_per_month.columns = ['released_month', 'count']

# Bar chart
plt.figure(figsize=(10, 6))
sns.barplot(data=tracks_per_month, x='released_month', y='count', palette='coolwarm')
plt.title('Number of Track Releases by Month')
plt.xlabel('Month')
plt.ylabel('Number of Releases')
plt.show()

