let speed: number;
let direction : string;
let pos = [90,90];
let cur_pos = [90,90];
let cur_speed : number;

enum Servos{
    SERVO_1,
    SERVO_2
}

function do_servo(servo : Servos, pos : number) {
    switch (servo){
    case Servos.SERVO_1:
        servos.P1.setAngle(pos);
        break;
    case Servos.SERVO_2:
        servos.P2.setAngle(pos);
        break;
    }
}

function do_motor(velocity : number)
{
    if (velocity >= 0){
        pins.analogWritePin(AnalogPin.P12, velocity);
        pins.analogWritePin(AnalogPin.P8, 0);
    }
    else {
        pins.analogWritePin(AnalogPin.P8, Math.abs(velocity));
        pins.analogWritePin(AnalogPin.P12, 0);
    }
}

basic.forever(function () {
    for (let i = 0; i < 2; ++i){
      if (pos[i] > cur_pos[i]){
        ++cur_pos[i];
      }
      else if (pos[i] < cur_pos[i]){
        --cur_pos[i];
      }
    }
    if (speed > cur_speed){
      ++cur_speed;
    }
    else if (speed < cur_speed){
        --cur_speed;
    }
    do_servo(Servos.SERVO_1, cur_pos[0]);
    do_servo(Servos.SERVO_2, cur_pos[1]);
    do_motor(cur_speed);
    basic.pause(10);
})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function on_uart_data_received() {
    let data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))

    switch (data.substr(0,1)){
        case "S":
            switch (data.substr(1,1)){
                case "1":
                    pos[0] = parseInt(data.substr(2));
                break;
                case "2":
                    pos[1] = parseInt(data.substr(2));
                break;
                default:
                break;
            }
        break;
        case "M":
            speed = parseInt(data.substr(1));
        break;
        default:
        break;
    }
})
