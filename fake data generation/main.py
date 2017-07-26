from Users import *
from Portfolios import *
import codecs, json
# from io import StringIO

def main():

	users = []
	portfolios = []
	
	for i in range(10):

		users.append(Users())
		portfolios.append(Portfolios())

	# with open("dis.txt","w") as out:
	# 	for i in range(len(users)):
	# 		if i != 0:
	# 			out.write("\n")
	# 		for num in users[i].distanceto(users):
	# 			out.write(str(num) + " ")

	# with open("portlist.txt","w") as out:
	# 	for i in range(len(portfolios)):
	# 		if i != 0:
	# 			out.write("\n")
	# 		for num in portfolios[i].portfolios:
	# 			out.write(str(num) + " ")

	users_out = []
	portfolios_out = []
	return_out = []
	data = {}
	
	for i in range(len(users)):
		users_out.append(list(users[i].distanceto(users)))
		portfolios_out.append(list(portfolios[i].portfolios))
		return_out.append(float(portfolios[i].portfolios_return))
	
	data['users_distance'] = users_out
	data['portfolio'] = portfolios_out
	data['return'] = return_out

	out = json.dumps(data)

	# with open('result.json', 'w') as fp:
	# 	json.dump(data, fp)
	# 	fp.close()

	return out
	# customers = {}
	# for i in range(len(users)):
	# 		if i != 0:
	# 			out.write("\n")
	# 		for num in users[i].distanceto(users):
	# 			out.write(str(num) + " ")

main()

