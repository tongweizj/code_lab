#!/bin/bash
#zhangbo 的脚本 sudo grep 'Booting Linux\|time server' /var/log/syslog | cut -d ' ' -f 1,2,3,5 | sed -n '/kernel/,+1p' | awk '/kernel/{if (x)print x;x="";}{x=(!x)?$0:x","$0;}END{print x;}' | sed 's/kernel:/BOOT/g' | sed 's/systemd.*/TIMESYNC/g'
# $./scan_syslog_reboot.sh 10.8.0.33 luciisgood
ip=$1
password=$2
foo() {
  sudo grep 'Booting Linux\|time server' /var/log/syslog | cut -d ' ' -f 1,2,3,5 | sed -n '/kernel/,+1p' | awk '/kernel/{if (x)print x;x="";}{x=(!x)?$0:x","$0;}END{print x;}' | sed 's/kernel:/BOOT/g' | sed 's/systemd.*/TIMESYNC/g'
}
# sshpass -p luciisgood ssh pi@10.8.0.33 "$foo" > 1.txt
sshpass -p $password ssh pi@$ip "sudo grep 'Booting Linux\|time server' /var/log/syslog | cut -d ' ' -f 1,2,3,5 | sed -n '/kernel/,+1p'" >>  temp.txt

file=`cat temp.txt | awk '/kernel/{if (x)print x;x="";}{x=(!x)?$0:x","$0;}END{print x;}' | sed 's/kernel:/+BOOT/g' | sed 's/systemd.*/+TIMESYNC;/g'`
echo $file >> temp.txt
echo -e "\n"
