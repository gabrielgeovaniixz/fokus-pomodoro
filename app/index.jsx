import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
  StatusBar,
  Vibration,
} from "react-native";

const pomodoro = [
  {
    id: "focus",
    initialValue: 25,
    image: require("./foco.png"),
    display: "Foco",
    color: "#BA4949",
  },

  {
    id: "short",
    initialValue: 5,
    image: require("./short.png"),
    display: "Pausa Curta",
    color: "#38858A",
  },

  {
    id: "long",
    initialValue: 15,
    image: require("./long.png"),
    display: "Pausa Longa",
    color: "#397097",
  },
];

export default function Index() {
  const [timerType, setTimerType] = useState(pomodoro[0]);

  const [time, setTime] = useState(
    pomodoro[0].initialValue * 60
  );

  const [isRunning, setIsRunning] = useState(false);

  // Atualiza o timer ao trocar modo
  useEffect(() => {
    setTime(timerType.initialValue * 60);
    setIsRunning(false);
  }, [timerType]);

  // Lógica do contador
  useEffect(() => {
    let interval = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsRunning(false);

      Vibration.vibrate([500, 300, 500]);

      alert(`${timerType.display} finalizado!`);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  // Formatação do timer
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (time % 60)
    .toString()
    .padStart(2, "0");

  // Resetar
  function resetTimer() {
    setTime(timerType.initialValue * 60);
    setIsRunning(false);
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: timerType.color,
        },
      ]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={timerType.color}
      />

      {/* IMAGEM */}
      <Image source={timerType.image} style={styles.image} />

      {/* CARD */}
      <View style={styles.actions}>
        {/* MODOS */}
        <View style={styles.context}>
          {pomodoro.map((p) => {
            const isSelected = timerType.id === p.id;

            return (
              <Pressable
                key={p.id}
                style={[
                  styles.contextButton,
                  isSelected &&
                    styles.contextButtonActive,
                ]}
                onPress={() => setTimerType(p)}
                android_ripple={{
                  color: "#ffffff20",
                }}
              >
                <Text
                  style={[
                    styles.contextButtonText,
                    isSelected &&
                      styles.contextButtonTextActive,
                  ]}
                >
                  {p.display}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* TIMER */}
        <Text style={styles.timer}>
          {minutes}:{seconds}
        </Text>

        {/* STATUS */}
        <Text style={styles.statusText}>
          {isRunning
            ? "Timer em andamento..."
            : "Timer pausado"}
        </Text>

        {/* BOTÕES */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              setIsRunning(!isRunning)
            }
            android_ripple={{
              color: "#00000020",
            }}
          >
            <Text style={styles.buttonText}>
              {isRunning ? "Pausar" : "Começar"}
            </Text>
          </Pressable>

          <Pressable
            style={styles.resetButton}
            onPress={resetTimer}
            android_ripple={{
              color: "#ffffff20",
            }}
          >
            <Text style={styles.resetButtonText}>
              Resetar
            </Text>
          </Pressable>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Projeto fictício e sem fins lucrativos.
        </Text>

        <Text style={styles.footerText}>
          Desenvolvido por Gabriel Geovani.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 40,
  },

  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },

  actions: {
    width: "90%",
    maxWidth: 420,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 32,
    backgroundColor: "#ffffff15",
    borderWidth: 1,
    borderColor: "#ffffff20",
    gap: 30,
  },

  // MODOS
  context: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  contextButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "transparent",
  },

  contextButtonActive: {
    backgroundColor: "#ffffff",
  },

  contextButtonText: {
    fontSize: 12.5,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },

  contextButtonTextActive: {
    color: "#000",
    fontWeight: "bold",
  },

  // TIMER
  timer: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 3,
  },

  statusText: {
    textAlign: "center",
    color: "#ffffffcc",
    fontSize: 14,
    marginTop: -10,
  },

  // BOTÕES
  buttonContainer: {
    gap: 12,
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 32,
    elevation: 4,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },

  resetButton: {
    paddingVertical: 14,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#ffffff50",
  },

  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
  },

  // FOOTER
  footer: {
    width: "90%",
    maxWidth: 400,
    opacity: 0.9,
  },

  footerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12.5,
    lineHeight: 20,
  },
});