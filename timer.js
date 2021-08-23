class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }
  getRefs() {
    const container = document.querySelector(this.selector);
    const daysRef = container.querySelector(`[data-value="days"]`);
    const hoursRef = container.querySelector(`[data-value="hours"]`);
    const minutesRef = container.querySelector(`[data-value="mins"]`);
    const secsRef = container.querySelector(`[data-value="secs"]`);
    return { daysRef, hoursRef, minutesRef, secsRef };
  }
  updateTimer({ daysRef, hoursRef, minutesRef, secsRef }) {
    const time = this.targetDate - Date.now();
    if (time < 1) {
      this.stopTimer();
      return;
    }
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    daysRef.textContent = days < 10 ? `0${days}` : days;
    hoursRef.textContent = hours < 10 ? `0${hours} ` : hours;
    minutesRef.textContent = mins < 10 ? `0${mins}` : mins;
    secsRef.textContent = secs < 10 ? `0${secs}` : secs;
  }
  startTimer() {
    this.intervalId = setInterval(() => this.updateTimer(this.getRefs()), 1000);
  }
  stopTimer() {
    clearInterval(this.intervalId);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Aug 23, 2021 23:51:00"),
});
timer.startTimer();
