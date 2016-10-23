# RetrieveServerStaticIPaddress
Provide a webservice to retrieve server static IP address

## Install Oray for ddns on Linux or Raspberry pi

First refer to the URL:
https://b.oray.com
to download the application. 

Note: No english version of this site, so ......, here I will provide a guide for Raspberry pi. After the settings finished, you need to register the client SN id on official site:
https://b.oray.com
But the operation still in Chinese...

Note: Guide for Raspberry, download the zip file:
[pi@centos-rpi3 huashengke]$ ll
total 1548
drwxrwxr-x. 2 pi pi   4096 Jan  1  1970 phddns2
-rw-rw-r--. 1 pi pi 777448 Sep 30 10:21 phddns_centos_i386.tgz
-rw-rw-r--. 1 pi pi 801473 Jul 21  2015 phddns_raspberry.tgz
[pi@centos-rpi3 huashengke]$ cd phddns2/
[pi@centos-rpi3 phddns2]$ dir
oray_serve  oraynewph  oraynewph.tgz  parse

modify the shell script: oraynewph, to delete the line start with update-rc.d:
update-rc.d oray_serve defaults
update-rc.d  -f oray_serve remove
then modify the oray_serve shell script, it is for registering linux startup service:
/usr/oray-app/bin/oraynewph -s 0.0.0.0 & 
to
/usr/oray-app/bin/oraynewph -s 0.0.0.0 > /tmp/oraylog 2>&1 &
Because Linux server need parse this file to get the static IP address.

then using root privillege to install:
sudo rm -rf /tmp/oraynewph_log
sudo ./oraynewph start
sudo systemctrl enable oray_serve.service [if this not work, just using: sudo chkconfig --add oray_serve]
Now, using ps aux, you can get the lines:
root       249  1.2  0.4  42228  4428 ?        Sl   10:45   0:19 /usr/oray-app/bin/oraynewph -s 0.0.0.0
root       261  0.6  0.2  13788  2540 ?        Ssl  10:45   0:09 /usr/oray-app/bin/oraysl -a 127.0.0.1 -p 16062 -s phsle01.oray.net:80 -d

and read the log file: /tmp/oraylog , you will get a line looks like:
2016-10-23 10:46:34     0x00000001  [Logon] logon server OK. public ip:58.40.64.126
Congrats, you got your static or public IP address.

## Start the webserver

to do
