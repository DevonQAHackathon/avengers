
fname = 'sample_feature.txt'

keywords = ['Given', 'And', 'When', 'Then']

with open(fname) as fd:
    data = fd.readlines()

feature = [ data[0].split('Feature: ')[1].split('\n')[0], data[1].split('\n')[0]]

scenario = data[2].split('Scenario: ')[1].split('\n')[0]

res = {"feature": feature, "scenario": { "name": scenario, "cond": []}}

last = ''

for i in range(3, len(data)):
	cond = {'key': '', 'value': ''}

	d1 = data[i].split('\n')[0]
	key = d1.split(' ',1)[0]

	if(key in keywords):
		print key
		if(key == 'And'):
			print 'And true'
			cond['key'] = last
		else:
			print 'And false'
			cond['key'] = key
			last = key
		print last

		cond['value'] = d1.split(' ',1)[1]

		res['scenario']['cond'].append(cond)

print res