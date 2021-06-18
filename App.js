import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// npx react-native run-android

export default function App() {
  const [gameState, setGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const initializeGame = () => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setCurrentPlayer(1);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Return 1 if Player 1 has won, and return -1 if player 2 has won
  const getWinner = () => {
    const NUM_TILES = 3;
    let arr = gameState;
    let sum;

    // Check rows...
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check columns...
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check the diagonals...
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // If all the above checks are unsuccessful then there are no winners...
    return 0;
  };

  const onTitlePress = (row, column) => {
    // Don't allow tiles to switch change...
    let value = gameState[row][column];
    if (value !== 0) {
      return;
    }

    // Set the correct title...
    let arr = gameState.slice();
    arr[row][column] = currentPlayer;
    setGameState(arr);

    // Switch to 2nd player...
    let nextPlayer = currentPlayer == 1 ? -1 : 1;
    setCurrentPlayer(nextPlayer);

    // Check for winners...
    let winner = getWinner();
    if (winner == 1) {
      Alert.alert("X WINS!");
      setXScore(xScore + 1);
      initializeGame();
    } else if (winner == -1) {
      Alert.alert("O WINS!");
      setOScore(oScore + 1);
      initializeGame();
    } else if (
      winner === 0 &&
      gameState[0][0] !== 0 &&
      gameState[0][1] !== 0 &&
      gameState[0][2] !== 0 &&
      gameState[1][0] !== 0 &&
      gameState[1][1] !== 0 &&
      gameState[1][2] !== 0 &&
      gameState[2][0] !== 0 &&
      gameState[2][1] !== 0 &&
      gameState[2][2] !== 0
    ) {
      Alert.alert("This game is a draw!");
      initializeGame();
    }
  };

  const onNewGamePress = () => {
    initializeGame();
  };

  const renderIcon = (row, column) => {
    let value = gameState[row][column];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  const resetScore = () => {
    setXScore(0);
    setOScore(0);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={styles.score}>
          <View
            style={[
              styles.scoreCard,
              {
                borderColor: `${currentPlayer === 1 ? "#14BDAC" : "#fffafa"}`,
                borderWidth: 2,
              },
            ]}
          >
            <Text>
              <Icon name="close" size={40} />
            </Text>
            <Text>{xScore > 0 ? xScore : "-"}</Text>
          </View>
          <View
            style={[
              styles.scoreCard,
              {
                borderColor: `${currentPlayer !== 1 ? "#14BDAC" : "#fffafa"}`,
                borderWidth: 2,
              },
            ]}
          >
            <Text>
              <Icon name="circle-outline" size={40} />
            </Text>
            <Text>{oScore > 0 ? oScore : "-"}</Text>
          </View>
        </View>
        <Button onPress={resetScore} title="Reset Score" />
      </View>
      <View style={{ height: 80 }} />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onTitlePress(0, 0)}
          style={[styles.title, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTitlePress(0, 1)}
          style={[styles.title, { borderTopWidth: 0 }]}
        >
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTitlePress(0, 2)}
          style={[styles.title, { borderRightWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onTitlePress(1, 0)}
          style={[styles.title, { borderLeftWidth: 0 }]}
        >
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTitlePress(1, 1)}
          style={styles.title}
        >
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTitlePress(1, 2)}
          style={[styles.title, { borderRightWidth: 0 }]}
        >
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onTitlePress(2, 0)}
          style={[styles.title, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTitlePress(2, 1)}
          style={[styles.title, { borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTitlePress(2, 2)}
          style={[styles.title, { borderRightWidth: 0, borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 50 }}>
        <Button title="New Game" onPress={onNewGamePress} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
  },
  title: {
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  tileX: {
    color: "black",
    fontSize: 60,
  },
  tileO: {
    color: "black",
    fontSize: 60,
  },
  score: {
    height: "auto",
    padding: 10,
    flexDirection: "row",
    marginLeft: 20,
  },
  scoreCard: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    justifyContent: "space-between",
    marginRight: 20,
    backgroundColor: "#fffafa",
    padding: 10,
    borderColor: "#fffafa",
  },
});
